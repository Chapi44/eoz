const { default: axios } = require("axios");
const { EventEmitter } = require("stream");
const path = require("path");
const fs = require("fs");
const genHtml = require("../reciept");
const puppeteer = require("puppeteer");

const generateReciept = async (req, res) => {
  let workflow = new EventEmitter();
  workflow.on("fetchData", async () => {
    const data_id = "6783a1be2927110e9f33b7fd";
    try {
      const getData = await axios.get(
        `https://becka.letsgotnt.com/api/v1/oasis/planOfCare/${data_id}`,
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
      console.log("=== getdata ####", getData.data.data, getData.status);
      if (getData.status === 200) {
        workflow.emit("formulateData", getData.data.data, data_id);
      } else {
        return res.status(400).json({
          success: false,
          message: "Data not found",
        });
      }
    } catch (error) {
      console.log("catch error in the fetch data ---", error.message);
      return res.status(500).json({
        success: false,
        message: "something went wrong try again later.",
      });
    }
  });

  workflow.on("formulateData", async (data, id) => {
    try {
      const pdfDir = path.join(__dirname, "../assets/receipts");
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }
      const fileName = `${id}`;
      const filePath = path.join(pdfDir, fileName);

      if (fs.existsSync(`${filePath}.pdf`)) {
        const outputFilePath = path.join(pdfDir, `${fileName}.pdf`);
        console.log("serving existing file...", outputFilePath);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
          "Content-Disposition",
          `inline; filename=${fileName}.pdf`
        );

        return res.sendFile(outputFilePath); // Return to avoid double send
      } else {
        console.log("File does not exist, generating new pdf...", data);
        const Recieptdata = {
          physicianOrPractitionerStatement:
            data.physicianOrPractitionerStatement,
          physicianAddress: data.certifyingPhysician.address,
          physicianName: data.certifyingPhysician.name,
          prognosis: data.prognosis.planOfCarePrognosis.response,
          functionalLimitations:
            data.functionalStatus.planOfCare.functionalLimitations.limitations,
        };
        console.log(" recipt data ---", Recieptdata);
        workflow.emit("generatepdf", Recieptdata, pdfDir, fileName); // Emit event only once
      }
    } catch (error) {
      console.log("catch error during formulate data", error.message);
      return res.status(500).json({
        success: false,
        message: "something went wrong, try again later",
      });
    }
  });

  workflow.on("generatepdf", async (Recieptdata, pdfDir, fileName) => {
    try {
      const filePath = path.join(pdfDir, fileName);

      const dynamicHtml = genHtml(Recieptdata);
      fs.writeFileSync(`${filePath}.html`, dynamicHtml, "utf8");
      console.log("Done generating HTML file:", pdfDir, fileName);

      // Emit event to serve PDF
      workflow.emit("servepdf", pdfDir, fileName);
    } catch (error) {
      console.error("Error in generating PDF:", error.message);
      return res.status(500).json({ message: "Please try again later" });
    }
  });

  workflow.on("servepdf", async (pdfDir, fileName) => {
    console.log("here in the generate Receipt");
    const outputFilePath = path.join(pdfDir, `${fileName}.pdf`);

    try {
      const htmlPath = path.join(`${pdfDir}/${fileName}.html`);
      const htmlContent = fs.readFileSync(htmlPath, "utf8");
      const browser = await puppeteer.launch({
        headless: true,
      });
      const page = await browser.newPage();

      await page.setContent(htmlContent, { waitUntil: "networkidle2" });

      await page.pdf({
        format: "A4",
        path: outputFilePath,
        scale: 1,
      });

      await browser.close();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `inline; filename=${fileName}.pdf`);

      // Send the file and return to avoid multiple responses
      return res.sendFile(outputFilePath);
    } catch (err) {
      console.error("Error generating PDF:", err);
      // Cleanup and return error response
      unlinkfile(`${pdfDir}/${fileName}.html`);
      return res.status(400).json({ message: "please try again" });
    }
  });

  workflow.emit("fetchData");
};

module.exports = {
  generateReciept,
};

import { PipelineContext } from "@secureupload/core";
import { ScanPipeline, createFakeScanner } from "@secureupload/scanners";

const cleanScanner = createFakeScanner({ clean: true, findings: [] });

const infectedScanner = createFakeScanner({
  clean: false,
  findings: [{ rule: "fake-virus", severity: "extreme", message: "pretend malware found" }],
});

const context1 = new PipelineContext({ filename: "test.txt" });
await new ScanPipeline([cleanScanner]).run(Buffer.from("hello"), context1);
console.log("Clean scanner result:", context1.findings);

const context2 = new PipelineContext({ filename: "test.txt" });
await new ScanPipeline([infectedScanner]).run(Buffer.from("hello"), context2);
console.log("Infected scanner result:", context2.findings);

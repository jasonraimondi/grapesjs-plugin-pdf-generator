// @ts-ignore
import grapesjs from "grapesjs";
import { jsPDF as HtmlToPdf } from "jspdf";

export default (editor: grapesjs.Editor, opts = {}) => {
  const pfx = editor.getConfig("stylePrefix");
  const btnPrint = document.createElement("button");
  const commandName = "gjs-generate-pdf";

  const options = {
    addPrintButton: true,
    btnLabel: "Export to PDF",
    root: (editor: grapesjs.Editor) =>
      `<!doctype html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <style>${editor.getCss()}</style>
          </head>
          <body>${editor.getHtml()}</body>
        <html>`,
    ...opts,
  };

  btnPrint.innerHTML = options.btnLabel;
  btnPrint.className = `${pfx}btn-prim`;

  editor.Commands.add(commandName, async (editor: grapesjs.Editor) => {
    const htmlToPdf = new HtmlToPdf();

    async function savePDF(content: string, js?: string) {
      if (js) htmlToPdf.addJS(js);
      await new Promise(resolve => htmlToPdf.html(content, { callback: resolve }));
      htmlToPdf.save("a4.pdf");
    }

    await savePDF(options.root(editor), editor.getJs());
  });

  if (options.addPrintButton) {
    editor.on("run:generate-pdf", () => {
      editor.Modal.getContentEl().appendChild(btnPrint);
      btnPrint.onclick = () => {
        editor.runCommand(commandName);
      };
    });
  }
};

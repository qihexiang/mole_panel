import * as $3DMol from "3dmol";
import { useEffect, useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { readTextFile } from "@tauri-apps/api/fs";
import { extname } from "@tauri-apps/api/path";

export default function Viewer(props: { selectAtom: (value: number) => void }) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [viewer, setViewer] = useState<$3DMol.GLViewer | null>(null);

  // 初始化画布
  useEffect(() => {
    if (container !== null) {
      setViewer($3DMol.createViewer(container, { backgroundColor: "white" }));
    }
  }, [container]);

  return (
    <div>
      <div
        id="viewer"
        style={{
          width: 800,
          height: 600,
        }}
        ref={(e) => setContainer(e)}
      ></div>
      <button
        onClick={async () => {
          const target = (await open({
            multiple: false,
            filters: [
              {
                name: "molecular file",
                extensions: ["xyz", "pdb", "mol2", "sdf", "pqr"],
              },
            ],
          })) as string | null;
          if (target !== null) {
            const fileContent = await readTextFile(target);
            const fileType = await extname(target);
            viewer?.addModel(fileContent, fileType);
            viewer?.setStyle(
              {},
              { sphere: { radius: 0.4 }, stick: { radius: 0.2 } }
            );
            viewer?.setClickable({}, true, (e: { serial: number }) => {
              props.selectAtom(e.serial);
            });
            viewer?.zoomTo();
            viewer?.render();
          }
        }}
      >
        添加分子
      </button>
    </div>
  );
}

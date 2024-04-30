import * as $3DMol from "3dmol";
import { useEffect, useState } from "react";

export default function Viewer() {
    const [selected, setSelected] = useState<number | null>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [viewer, setViewer] = useState<$3DMol.GLViewer | null>(null);

    // 初始化画布
    useEffect(() => {
        if (container !== null) {
            setViewer($3DMol.createViewer(container, {backgroundColor: "white"}))
        }
    }, [container])

    return <div>
        <div id="viewer" style={{
            width: 800, height: 600
        }} ref={e => setContainer(e)}></div>
        <div>当前选择的原子：{selected}</div>
        <button onClick={() => {
            viewer?.addModel(`TITLE       Required
REMARK   1 File created by GaussView 6.0.16
HETATM    1  C           0       1.025   1.313   0.000                       C
HETATM    2  C           0       2.420   1.313   0.000                       C
HETATM    3  C           0       3.118   2.521   0.000                       C
HETATM    4  C           0       2.420   3.729  -0.001                       C
HETATM    5  C           0       1.025   3.729  -0.002                       C
HETATM    6  C           0       0.328   2.521  -0.001                       C
HETATM    7  H           0       0.475   0.361   0.000                       H
HETATM    8  H           0       2.970   0.360   0.001                       H
HETATM    9  H           0       4.218   2.521   0.001                       H
HETATM   10  H           0       2.970   4.681  -0.001                       H
HETATM   11  H           0       0.475   4.681  -0.003                       H
HETATM   12  H           0      -0.772   2.521  -0.001                       H
END
CONECT    1    2    6    7
CONECT    2    1    3    8
CONECT    3    2    4    9
CONECT    4    3    5   10
CONECT    5    4    6   11
CONECT    6    1    5   12
CONECT    7    1
CONECT    8    2
CONECT    9    3
CONECT   10    4
CONECT   11    5
CONECT   12    6
            `, "pdb")
            viewer?.setStyle({}, {sphere: {radius: 0.4}, stick:{radius: 0.2}})
            viewer?.setClickable({}, true, (e: {serial: number}) => {
                setSelected(e.serial)
            })
            viewer?.zoomTo();
            viewer?.render();
        }}>添加分子</button>
    </div>
}
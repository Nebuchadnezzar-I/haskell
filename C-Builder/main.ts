import data from './data.json';

const stringToRSType = (type: string) => {
    if (type === "double") return "f64";
    if (type === "float") return "f32";
    if (type === "char") return "u8";
    if (type === "int") return "i32";
    if (type === "int *") return "*const i32";
    return type
}

function walkTree(node: any, callback: (value: any, path: any) => void, path = "") {
    if (typeof node === "object" && node !== null) {
        if (Array.isArray(node)) {

            node.forEach((item, index) => {
                walkTree(item, callback, `${path}[${index}]`);
            });

        } else {

            for (const key in node) {
                if (Object.prototype.hasOwnProperty.call(node, key)) {
                    walkTree(node[key], callback, `${path ? path + "." : ""}${key}`);

                }
            }

            if (node.kind == "FunctionDecl") {
                const param = [];

                for (let i = 0; i < node.inner.length - 1; i++) {
                    param.push(`${node.inner[i].name}: ${stringToRSType(node.inner[i].type.qualType) || ""}`);
                }

                let param_str = "";
                param.map((data, i) => {
                    if (i !== param.length - 1) {
                        param_str += data + ", "
                    } else {
                        param_str += data
                    }
                })


                console.log(`fn ${node.name}(${param_str}) -> ${stringToRSType(node.type.qualType.split(" ")[0])} {}`);
            }

        }
    } else {
        callback(node, path);
    }
}

function logNode(value: any, path: any) {
}

walkTree(data, logNode);

import fs from "node:fs/promises";

export async function readFile(file){
    const data = await fs.readFile(file, 'utf-8');
    return JSON.parse(data);
}

export async function writeFile(file, data){
    await fs.writeFile(
        file,
        JSON.stringify(data, null, 4),
        'utf-8'
    );
}
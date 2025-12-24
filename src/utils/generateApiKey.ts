import { prisma } from "../../lib/pisma";

async function generate_api_key() {
    const apiKey = crypto.randomUUID();
    const upload = await prisma.apiKey.create({
        data: {
            key: apiKey
        }
    })
    upload ? (await Bun.file('.apikey').write(apiKey), 
    console.log(`API Key generated: ${apiKey}`)) : 
    console.error("Failed to generate API key");
    
}

export { generate_api_key };
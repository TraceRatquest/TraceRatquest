import { generate_api_key } from '../utils/generateApiKey';


const args = Bun.argv;

export const onStartServer = async () => {
    if (args.includes('--generate-api-key')) {
        await generate_api_key();
        process.exit(0);
    } else if (args.includes('--help')) {
        console.log(`Usage: bun run src/core/cli.ts [options]
    
    Options:
      --generate-api-key    Generate a new API key and save it to a file
      --runserver           Start the TraceRatquest server
      --help                Show this help message
    `);
        process.exit(0);
    } else if (args.includes('--runserver')) {
        return;
    } else {
        console.log("No valid arguments provided. Use --help to see available options.");
        process.exit(0);
    }
}

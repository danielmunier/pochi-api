import {config} from "dotenv"
import { createApp } from "./utils/createApp"
config()



const PORT = process.env.PORT || 1500

async function main() {
    try {
        const app = createApp()
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`)
        })

    }catch(e) {
        console.log(e)
    }
}

main()

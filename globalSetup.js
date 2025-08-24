import * as dotenv from "dotenv"

//default exports
export default () => {
    dotenv.config({path: "utils/.env"})
}
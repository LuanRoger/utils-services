import FiisRoutes from "./modules/fiis/routes";
import FiagroRoutes from "./modules/fiagro/routes";
import NotionRoutes from "./modules/notion/routes";
import { DEFAULT_PORT } from "./constants";
import { parseNumber } from "./utils/numbers";
import inngestPlugin from "./plugins/inngest";
import Elysia from "elysia";

const app = new Elysia()
app.use(inngestPlugin)

app.use(FiisRoutes)
app.use(FiagroRoutes)
app.use(NotionRoutes)

const port = parseNumber(process.env.PORT) ?? DEFAULT_PORT;
app.listen(port)

console.log(`Server is running at ${app.server?.hostname}:${app.server?.port}`)

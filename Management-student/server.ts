import "reflect-metadata";                                      // Dùng để bật metadata cho decorator --- bắt buộc khi sử dụng tsoa
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";                     // Hiển thị swagger lên trình duyệt
import swaggerDocument from "./src/tsoa/swagger.json";          // chứa các endpoint
import { RegisterRoutes } from "./src/tsoa/routes";
import { requireJWT } from "./Middleware/CheckToken";
import { connectDatabase } from "./ConnectDatabase/ConnectDatabase";

const app = express();                                          // Tạo ứng dụng trên server
app.use(cors());                                                // bật cors cho mọi request 
app.use(express.json());

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

async function run() {
	try {
		await connectDatabase();
		RegisterRoutes(app);

		app.listen(3000, () => {
			console.log("API chạy tại http://localhost:3000");
			console.log("Test các API tại http://localhost:3000/docs");
		});
	} catch (error: any) {
		console.error(`BOOT ERROR: ${error}`)
		process.exit(1)
	}
}

run();

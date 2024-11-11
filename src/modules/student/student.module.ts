import { Module } from "@nestjs/common";
import { StudentsService } from "./student.service";
import { StudentsController } from "./student.controller";
import { StudentsRepository } from "./student.repository";

@Module({
    imports: [],
    controllers: [StudentsController],
    providers: [StudentsService, StudentsRepository],
    exports: [StudentsService,]
})
export class StudentsModule {}

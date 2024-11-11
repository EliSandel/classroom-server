import { Module } from "@nestjs/common";
import { ClassroomService } from "./classroom.service";
import { ClassesController } from "./classroom.controller";
import { StudentsModule } from "../student/student.module";
import { ClassroomRepository } from "./classroom.repository";

@Module({
    imports: [StudentsModule],
    controllers: [ClassesController],
    providers: [ClassroomService, ClassroomRepository]
})
export class ClassesModule {}
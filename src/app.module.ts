import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';


import { StudentsModule } from './modules/student/student.module';
import { ClassesModule } from './modules/classroom/classroom.module';
import { Student } from './modules/student/entities/student.entity';
import { Classroom } from './modules/classroom/entities/classroom.entity';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    StudentsModule, 
    ClassesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


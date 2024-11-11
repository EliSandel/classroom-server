import { Sequelize } from 'sequelize-typescript';
import { Classroom } from '../classroom/entities/classroom.entity';
import { Student } from '../student/entities/student.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      try {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'myuser',
          password: 'mypassword',
          database: 'mydatabase',
          logging: console.log,
        });

        sequelize.addModels([Student, Classroom]);
        await sequelize.sync();

        console.log("successfully connected to database");
        return sequelize;
        
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error; 
      }
    },
  },
];

import { Sequelize } from 'sequelize-typescript';
import { Student } from '../student/entities/student.entity';
import { Classroom } from '../classroom/entities/classroom.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      try {
        const sequelize = new Sequelize({
          dialect: 'postgres',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          logging: console.log,
        });

        sequelize.addModels([Student, Classroom]);
        await sequelize.sync();

        return sequelize;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
      }
    },
  },
];

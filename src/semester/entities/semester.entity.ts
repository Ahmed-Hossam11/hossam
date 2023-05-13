// export class Semester {}
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { University } from 'src/university/models/university.model';
import { Student } from 'src/users/models/student.model';
import { User } from 'src/users/models/_user.model';

export type SemesterDocument = Semester & Document;

@Schema({ timestamps: true })
export class Semester {
    @Prop({ type: String, required: true })
    nameAr: string;

    @Prop({ type: String, required: true })
    nameEn: string;

    @Prop({
        type: Boolean, default: true
    })
    enable?: boolean;
}
const SemesterSchema = SchemaFactory.createForClass(Semester);

export { SemesterSchema };

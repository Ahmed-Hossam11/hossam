import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { University } from 'src/university/models/university.model';
import { Student } from 'src/users/models/student.model';
import { User } from 'src/users/models/_user.model';

export type CollageDocument = Collage & Document;

@Schema({ timestamps: true })
export class Collage {
    @Prop({ type: String, required: true })
    nameAr: string;

    @Prop({ type: String, required: true })
    nameEn: string;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: University.name,
        required: true,
    })
    university: string;

    @Prop({
        type: Boolean, default: true
    })
    enable?: boolean;
}
const CollageSchema = SchemaFactory.createForClass(Collage);

export { CollageSchema };

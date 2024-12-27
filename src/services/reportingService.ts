import { School, ISchool } from "../models/school";
import { ClassRoom } from "../models/classRoom";
import { Student } from "../models/student";

class ReportingService {
    async getSummaryReportBySuperadminId(id: string): Promise<any> {
        try {
            console.log("ID: ", id);
            const schools = await School.find({ superadminId: id });
            const schoolIds = schools.map(school => school._id);

            const totalSchools = schools.length;
            const totalClasses = await ClassRoom.countDocuments({ schoolId: { $in: schoolIds } });
            const totalStudents = await Student.countDocuments({ schoolId: { $in: schoolIds } });

            return {
                totalSchools,
                totalClasses,
                totalStudents,
            };
        } catch (error) {
            throw new Error(`Error fetching summary report`);
        }
    };
}

export const reportingService = new ReportingService();
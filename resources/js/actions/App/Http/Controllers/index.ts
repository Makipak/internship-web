import InternshipApplicationController from './InternshipApplicationController'
import AdminInternshipController from './AdminInternshipController'

const Controllers = {
    InternshipApplicationController: Object.assign(InternshipApplicationController, InternshipApplicationController),
    AdminInternshipController: Object.assign(AdminInternshipController, AdminInternshipController),
}

export default Controllers
import InternshipApplicationController from './InternshipApplicationController'
import AdminInternshipController from './AdminInternshipController'
import Settings from './Settings'

const Controllers = {
    InternshipApplicationController: Object.assign(InternshipApplicationController, InternshipApplicationController),
    AdminInternshipController: Object.assign(AdminInternshipController, AdminInternshipController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers
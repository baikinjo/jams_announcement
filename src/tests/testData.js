/* Contact ======================================================================================== */
export const CONTACT_DATA = ({
  firstName: 'Dilly',
  lastName: 'Jones',
  phone: '604-555-5555',
  email: 'helllhejkjkjkjkrlhell@rmc.com'
})

export const FALSE_CONTACT_DATA = ({
  lastName: 'Baik'
})

/* Concrete ======================================================================================== */
export const CONCRETE_DATA =({
  name: 'RMXGGG265',
  mpa: 20,
  cost: 114.32,
  aggSize: 10,
  airPercent: '4-5%',
  slump: 20,
  exposure: 'N',
  expectedVolume: 20
})

/* Concrete Addon ======================================================================================== */
export const CONCRETE_ADDON_DATA = ({
  name: 'Concrete Addon',
  uom: 'Meters',
  cost: 323
})

/* Project ======================================================================================== */
export const PROJECT_DATA = ({
  name: 'Jest Construction',
  jobNum: 'J-001',
  concreteExpectedVolume: 20000,
  endDate: '2018-05-18T21:06:01.746Z'
})

/* Trade ======================================================================================== */
export const TRADE_DATA = ({
  name: 'Abc Company',
  address: '123 Main City, A1A 1A1, Canada',
  email: 'abc@google.ca',
  division: '03 division'
})

export const FALSE_TRADE_DATA = ({
  name: 'Nike',
  email: 'nike@nike.ca',
  division: '05 manufacturing'
})

/* Users with different roles ======================================================================================== */
export const ADMIN_PASSWORD = '1234'

export const ADMIN = {
  email: 'admin@ventanaconstruction.com',
  username: 'admin',
  firstName: 'John',
  lastName: 'Smith',
  position: 'Superintendent',
  phone: '123-123-1231',
  role: 'ADMIN',
  password: ADMIN_PASSWORD
}

export const NORMAL_USER_PASSWORD = 'abcdefg'

export const NORMAL_USER = {
  email: 'user@ventanaconstruction.com',
  username: 'jdoe',
  firstName: 'John',
  lastName: 'Doe',
  position: 'Other',
  phone: '123-123-1231',
  role: 'NORMAL_USER',
  password: NORMAL_USER_PASSWORD,
  tradePermission: {
    trade: {

    }
  }
}

export const PROJECT_USER_PASSWORD = '2345'

export const PROJECT_USER = {
  email: 'project@ventanaconstruction.com',
  username: 'ssmith',
  firstName: 'Sam',
  lastName: 'Smith',
  position: 'Other',
  phone: '604-789-1230',
  role: 'NORMAL_USER',
  password: PROJECT_USER_PASSWORD
}
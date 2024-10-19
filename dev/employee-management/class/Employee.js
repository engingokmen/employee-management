export class Employee {
  constructor(
    firstName = '',
    lastName = '',
    dateOfEmployment = '',
    birth = '',
    phone = '',
    email = '',
    department = '',
    position = ''
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfEmployment = dateOfEmployment;
    this.birth = birth;
    this.phone = phone;
    this.email = email;
    this.department = department;
    this.position = position;
  }
}

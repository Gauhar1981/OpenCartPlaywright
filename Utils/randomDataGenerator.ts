import{faker} from "@faker-js/faker"

export class RandomDataUtil
{
 static getFirstName()
 {
    return faker.person.firstName();
 }

 static getLastName()
 {
    return faker.person.lastName();
 }

 static getFullName()
 {
    return faker.person.fullName();
 }

  static getEmail()
 {
    return faker.internet.email();
 }

 static getPhoneNumber()
 {
    return faker.phone.number();
 }

  static getRandomPassword(length:number=10):string
 {
    return faker.internet.password({length});
 }

}
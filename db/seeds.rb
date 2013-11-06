# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u = User.create({login: "r5i", password: "demo1"})
u.confirm!

u.fields.create({ data: {
  name: "Mafia",
  conservationPractice: "Grade stabilization full flow",
  tileDrainage: "Yes",
  goodDrainage: "No",
  ownOrRent: "Own",
  bufferName: "Jakson Buffer",
  bufferWidth: "1000",
  vegetation: "Perennial grass"
}})

u.fields.create({ data: {
  name: "Titanic",
  conservationPractice: "Grade stabilization full flow",
  tileDrainage: "Yes",
  goodDrainage: "No",
  ownOrRent: "Own",
  bufferName: "Jakson Buffer",
  bufferWidth: "1000",
  vegetation: "Perennial grass"
}})

u.operations.create({ data: {
  name: "TestOne"
}})
u

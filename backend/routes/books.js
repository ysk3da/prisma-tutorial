const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

/* GET books listing. */
router.get('/', async(req, res, next) => {
  // res.json({ title: '吾輩は猫である' });
  const prisma = new PrismaClient();
    const allBooks = await prisma.books.findMany();
    res.json(allBooks);
});

// 新規データ作成
router.post('/', async(req, res, next) => {
  const prisma = new PrismaClient();
  const data = {data:req.body};
  const book = await prisma.books.create(data);
  res.json(book);
});

// 更新
router.put('/', async(req, res, next) => {
  const prisma = new PrismaClient();
  //prismaの更新は where:とdata:で指定する。
  //{where: {条件},data:{key:value,key:value}}
  const data = {where:{id:req.body.id},data:req.body};
  const book = await prisma.books.update(data);
  res.json(book);
});

// 削除
router.delete('/', async(req, res, next) => {
  const prisma = new PrismaClient();
  //prismaの削除は{where:{条件}}で指定する。
  const data = {where:{id:req.body.id}};
  const book = await prisma.books.delete(data);
  res.json(book);
});
module.exports = router;
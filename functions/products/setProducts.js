const cors = require('cors')({ origin: true })
const db = require('../database')
const uuidv1 = require('uuid/v1')
const _ = require('lodash')

const setProducts = async (req, res) => {
  cors(req, res, async () => {
    try {
      const { data, deletedDocIds } = req.body

      // Validate data
      data.forEach(product => {
        if (product.sku.trim() === "") {
          throw new Error("SKU cannot be empty.")
        }
        if (product.category.trim() === "") {
          throw new Error("Category is required")
        }
        if (product.title.trim() === "") {
          throw new Error("Title is required")
        }

        product.variations.forEach(variation => {
          if (variation.sku.trim() === "") {
            throw new Error("SKU is required for variations")
          }
          if (variation.pid.trim() === "") {
            throw new Error("Product ID is required for variations")
          }
          if (variation.pidType.trim() === "") {
            throw new Error("Product ID Type is required for variations")
          }
          if (variation.title.trim() === "") {
            throw new Error("Title is required for variations")
          }
          if (variation.color.trim() === "") {
            throw new Error("Color is required for variations")
          }
          if (!variation.colorMap.length) {
            throw new Error("Color Map is required for variations")
          }
          if (variation.size.trim() === "") {
            throw new Error("Size is required for variations")
          }
          if (!variation.sizeMap.length) {
            throw new Error("Size Map is required for variations")
          }
          if (!variation.material.length) {
            throw new Error("Material is required for variations")
          }
          if (variation.thumbnail.trim() === "") {
            throw new Error("Thumbnail is required for variations")
          }
          if (variation.mainImage.trim() === "") {
            throw new Error("Main Image is required for variations")
          }
          if (variation.stock.trim() === "") {
            throw new Error("Stock is required for variations")
          }
          if (variation.price.trim() === "") {
            throw new Error("Price is required for variations")
          }
          if (!/^(0|[1-9]\d*)$/.test(variation.stock.trim())) {
            throw new Error("Stock should be a positive integer")
          }
          if (!/^(0|[1-9]\d*)\.[0-9]{2}$/.test(variation.price.trim())) {
            throw new Error("Price is incorrectly formatted - please indicate two digits of cents followed by dot (.) (ex. 12.99)")
          }
          if (Number(variation.price) === 0) {
            throw new Error("Price of 0 is not allowed")
          }
        })
      })
      if (_.uniqBy(data, 'sku').length !== data.length) {
        throw new Error("Found duplicated SKU that has to be unique")
      }


      // Reorganize data
      data.forEach(product => {
        product.bulletPoints = [
          product.bulletPoints1,
          product.bulletPoints2,
          product.bulletPoints3,
          product.bulletPoints4,
          product.bulletPoints5,
        ]
        _.remove(product.bulletPoints, bp => !bp)
        product.stock = 0
        product.colorMap = []
        product.sizeMap = []

        if (product.variations.length) {
          const minPrice = _.minBy(product.variations, v => Number(v.price)).price
          if (minPrice) {
            product.minPrice = minPrice
          }
          const maxPrice = _.maxBy(product.variations, v => Number(v.price)).price
          if (maxPrice) {
            product.maxPrice = maxPrice
          }
          product.frontProductSku = _.maxBy(product.variations, 'soldCount').sku
        }

        product.variations.forEach(variation => {
          variation.bulletPoints = [
            variation.bulletPoints1,
            variation.bulletPoints2,
            variation.bulletPoints3,
            variation.bulletPoints4,
            variation.bulletPoints5,
          ]
          _.remove(variation.bulletPoints, bp => !bp)
          variation.images = [
            variation.image1,
            variation.image2,
            variation.image3,
            variation.image4,
            variation.image5,
            variation.image6,
            variation.image7,
          ]
          _.remove(variation.images, image => !image)
          variation.parentSku = product.sku
          variation.stock = variation.stock.trim()
          variation.price = variation.price.trim()
          product.stock = Number(product.stock) + Number(variation.stock)
          product.colorMap.push(...variation.colorMap)
          product.colorMap = _.uniq(product.colorMap)
          product.sizeMap.push(...variation.sizeMap)
          product.sizeMap = _.uniq(product.sizeMap)
        })
      })

      // Get a new write batch
      const batch = db.batch();

      data.forEach(product => {
        // Set the value of each product
        let productRef = db.collection('products').doc(product.id || uuidv1());
        batch.set(productRef, product);
      })

      deletedDocIds.forEach(id => {
        let deleteRef = db.collection('products').doc(id)
        batch.delete(deleteRef)
      })

      // Commit the batch
      const result = await batch.commit()
      return res.status(200).json(result)

    } catch (e) {
      console.log(e)
      return res.status(500).json({
        name: e.name,
        message: e.message,
        stack: e.stack,
      })
    }
  })
}

module.exports = setProducts

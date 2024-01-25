import React, { Fragment } from 'react'
import classes from './index.module.scss'
import { Order } from '../../../../../../payload/payload-types'
import Link from 'next/link'
import { HR } from '../../../../../_components/HR'
import { Media } from '../../../../../_components/Media'
import { Price } from '../../../../../_components/Price'

interface OrderItemProps{
  order: Order | null 
}

const OrderItem = ({ product, title, metaImage, quantity, index, order, stripeProductID, id  }) => {

  return (
    <li className={classes.item} key={order.id}>     
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            className={classes.media}
            imgClassName={classes.image}
            resource={metaImage}
            fill
          />
        )}
      </Link>

      <div className={classes.itemDetails}>
        {!stripeProductID && (
          <p className={classes.warning}>
            {'This product is not yet connected to Stripe. To link this product, '}
            <Link
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
            >
              edit this product in the admin panel
            </Link>
            {'.'}
          </p>
        )}

        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          <Price product={product} button={false} />
        </div>          
        <p className={classes.quantity}>x{quantity}</p>
      </div>

      <div className={classes.subtotal}>
        <Price product={product} button={false} quantity={quantity} />
      </div>
    </li>
  )       
}


export default OrderItem
import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Order } from '../../../../../payload/payload-types'
import { Button } from '../../../../_components/Button'
import { Gutter } from '../../../../_components/Gutter'
import { HR } from '../../../../_components/HR'
import { Media } from '../../../../_components/Media'
import { Price } from '../../../../_components/Price'
import { formatDateTime } from '../../../../_utilities/formatDateTime'
import { getMeUser } from '../../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'
import OrderItem from './OrderItem/page'

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to view this order.',
    )}&redirect=${encodeURIComponent(`/order/${id}`)}`,
  })

  let order: Order | null = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!order) {
    notFound()
  }

  return (
    <div>
        <div className={classes.orderId}>
          <div>
            <h5>
              {`Order`}
              <span className={classes.id}>{`${order.id}`}</span>
            </h5>
          </div>
          <div className={classes.borderOrder}>
            <p>{`ID: ${order.id}`}</p>
            <p>{`Payment Intent: ${order.stripePaymentIntentID}`}</p>
            <p>{`Ordered On: ${formatDateTime(order.createdAt)}`}</p>
          </div>
        </div>

        <div className={classes.order}>
          <div className={classes.header}>
            <p>Products</p>
            <div className={classes.headerItemDetails}>
              <p></p>
              <p className={classes.quantity}>Quantity</p>
            </div>
            <p className={classes.subtotal}>Subtotal</p>
          </div>

          <ul>
            {order.items?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { id, title, meta, stripeProductID },
                } = item

                const isLast = index === (order?.items?.length || 0) - 1

                const metaImage = meta?.image

                return (
                  <Fragment key={index}>
                    <OrderItem 
                      product={product}
                      title={title}
                      metaImage={metaImage}
                      quantity={quantity}
                      index={index}
                      order={order}
                      stripeProductID={stripeProductID}
                      id={id}
                    />
                  </Fragment>
                )
              }

              return null
            })}
          </ul>
        </div>
        <div className={classes.orderTotal}>
            <p>Order Total</p>
            <p className={classes.total}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'usd',
            }).format(order.total / 100)}
            </p>
        </div>
        <div className={classes.actions}>
          <Button href="/account" appearance="secondary" label="Go to account" className={classes.btn}/>
          <Button href="/orders" appearance="primary" label="See all orders" className={classes.btn} />
        </div>
    </div>
  )
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Order ${id}`,
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  }
}

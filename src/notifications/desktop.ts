import notifier from 'node-notifier'

import { getTitle, getMessage } from './shared'

export const desktopNotification = (
  product: string,
  price: number,
  linkToOpen: string
) =>
  notifier.notify({
    title: getTitle({ showProgramName: true }),
    message: getMessage(product, price),
    open: linkToOpen,
    wait: true,
  })

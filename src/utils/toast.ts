import { notification } from 'antd'

export const toastRemoveSuccess = () => {
  notification.success({
    message: 'Delete successfully.',
  })
}

export const toastUpdateSuccess = () => {
  notification.success({
    message: 'Update successfully.',
  })
}

export const toastCreateSuccess = () => {
  notification.success({
    message: 'Create successfully.',
  })
}

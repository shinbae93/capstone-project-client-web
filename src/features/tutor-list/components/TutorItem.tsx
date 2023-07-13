import { FC } from 'react'
import { DEFAULT_IMG } from '../../../common/constants'
import { TutorDetail } from '../../../graphql/generated/graphql'

interface TutorItemProps {
  tutor: TutorDetail
}

export const TutorItem: FC<TutorItemProps> = ({ tutor }) => (
  <div className="overflow-hidden grid grid-cols-course-item items-center py-5">
    {/** Thumbnail */}
    <img
      src={tutor?.user?.avatar || DEFAULT_IMG}
      alt="Avatar"
      title={tutor?.user?.fullName}
      className="rounded-full w-40 h-40 object-cover"
    />
    {/** Content */}
    <div>
      {/** Full name */}
      <div>
        <p className="font-semibold text-xl mb-2">{tutor?.user?.fullName}</p>
        <p className="text-sm">{tutor?.headline}</p>
      </div>
      {/** Description */}
      <div className="py-4">
        <p>{tutor?.biography || 'No description.'}</p>
      </div>
    </div>
  </div>
)

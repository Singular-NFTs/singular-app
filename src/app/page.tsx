import TokenList from '@app/components/TokenList'

import { TITLE } from '@app/constants'

const SPACE_Y = 6;

export default function Home() {
  return (
    <div className={`py-10 space-y-${SPACE_Y}`}>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
        {TITLE}
      </h1>
      <div className={`space-y-${SPACE_Y}`}>
        <TokenList />
      </div>
    </div>
  )
}
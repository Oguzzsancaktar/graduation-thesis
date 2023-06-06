import React from 'react'

const CalendarView = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <div>
          Calendar   Searchbar
        </div>
        <div>
          incoming reseervations
        </div>
      </div>

      <div className="flex flex-col">
        <div>
          userbar
        </div>
        <div className="flex flex-col">
          <div>
            User Welcome and Room Info
          </div>
          <div className="flex flex-row">
            <div>
              info card
            </div>
            <div>
              info card
            </div>
            <div>
              info card
            </div>
          </div>
          <div>
            Weekly Room Full chart
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarView

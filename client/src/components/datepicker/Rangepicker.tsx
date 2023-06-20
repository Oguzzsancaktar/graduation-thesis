
import React, { useEffect, useState } from 'react'
// Libs.
import moment from 'moment'
// @ts-ignore
import Datepicker from "tailwind-datepicker-react"
import { momentDateFormat } from '@/constants'


const defautlOptions = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: true,
  clearBtn: true,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    // background: "bg-gray-700 dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "bg-gray-100",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
}


interface IProps {
  onChange: (date: Date, type: "start" | "end") => void
}

const Rangepicker: React.FC<IProps> = ({ onChange }) => {
  const [showStart, setShowStart] = useState<boolean>(false)
  const [showEnd, setShowEnd] = useState<boolean>(false)

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(moment(new Date()).add(1, "days").toDate())


  const handleChange = (selectedDate: Date, type: "start" | "end") => {
    if (type === "start") {
      setStartDate(selectedDate)
    } else {
      setEndDate(selectedDate)
    }
  }
  const handleClose = (state: boolean) => {
    setShowStart(state)
    setShowEnd(state)
  }

  useEffect(() => {
    onChange(startDate, "start")
    if (moment(startDate).isAfter(endDate)) {
      setEndDate(moment(startDate).add(1, "days").toDate())
    }
  }, [showStart])

  useEffect(() => {
    onChange(endDate, "end")

    if (moment(endDate).isBefore(startDate)) {
      setStartDate(moment(endDate).subtract(1, "days").toDate())
    }
  }, [showEnd])

  return (
    <div className="grid md:grid-cols-2 md:gap-6">
      <Datepicker options={{ ...defautlOptions, title: "Start Date" }} onChange={(date: Date) => handleChange(date, "start")} show={showStart} setShow={handleClose}>
        <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input value={moment(startDate).format(momentDateFormat)} onFocus={() => setShowStart(true)} readOnly name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" />
        </div>
      </Datepicker>
      <Datepicker options={{ ...defautlOptions, title: "End Date" }} onChange={(date: Date) => handleChange(date, "end")} show={showEnd} setShow={handleClose}>
        <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
          </div>
          <input value={moment(endDate).format(momentDateFormat)} onFocus={() => setShowEnd(true)} readOnly name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" />
        </div>


      </Datepicker>
    </div>
  )
}

export default Rangepicker

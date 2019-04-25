// import { assign, actions } from "xstate"
// const { raise } = actions

// const statechart = {
//   id: "filter",
//   type: "parallel",
//   context: {
//     canFilterMonths: false,
//   },
//   states: {
//     years: {
//       initial: "all_years",
//       states: {
//         all_years: {
//           // THIS DID IT FOR ENSURING THAT THE DROP DOWN STATES
//           // ARE IN SYNC IN THE DESIRABLE CONFIGURATION.
//           onEntry: raise("ALL_MONTHS"),
//           on: {
//             SINGLE_YEAR: {
//               target: "single_year",
//               actions: [assign({ canFilterMonths: true })],
//             },
//           },
//         },
//         single_year: {
//           on: {
//             ALL_YEARS: "all_years",
//             actions: [assign({ canFilterMonths: false })],
//           },
//         },
//       },
//     },
//     months: {
//       initial: "all_months",
//       states: {
//         all_months: {
//           on: {
//             SINGLE_MONTH: {
//               target: "single_month",
//               cond: ({ canFilterMonths }, event) => canFilterMonths,
//             },
//           },
//         },
//         single_month: {
//           on: {
//             ALL_MONTHS: "all_months",
//           },
//         },
//       },
//     },
//   },
// }

// export default statechart

// // const filterMachine = Machine(statechart)

// // const filterService = interpret(filterMachine)
// //   .onTransition(state =>
// //     console.log("state machine current value onTransition: ", state.value)
// //   )
// //   .start()

// // filterService.send("SINGLE_YEAR")
// // filterService.send("SINGLE_MONTH")
// // filterService.send("ALL_YEARS")

// // const { initialState } = filterMachine
// // const singleYearState = filterMachine.transition(initialState, "SINGLE_YEAR")
// // const singleMonthState = filterMachine.transition(
// //   singleYearState,
// //   "SINGLE_MONTH"
// // )
// // const allYearsAgain = filterMachine.transition(singleMonthState, "ALL_YEARS")

// // console.log("final transition value: ", allYearsAgain.value)

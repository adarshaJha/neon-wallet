// @flow
import React from 'react'
import classNames from 'classnames'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { map, times } from 'lodash'

import { toNumber } from '../../../core/math'
import { formatThousands } from '../../../core/formatters' // formatFiat
import { CURRENCIES } from '../../../core/constants'

import styles from './PortfolioBreakdownChart.scss'

const COLORS = ['#a866ee', '#edaa66', '#ee6d66', '#66edcd']

type Props = {
  className?: string,
  balances: { [key: SymbolType]: string },
  currency: string
}

export default class PortfolioBreakdownChart extends React.Component<Props> {
  render = (): React$Node => {
    const { className } = this.props
    const data = this.getData()

    return (
      <ResponsiveContainer width={250} height={180} className={classNames(styles.priceHistoryChart, className)}>
        <PieChart width={200} height={180}>
          <Pie data={data} dataKey='balance' nameKey='symbol' innerRadius={40} outerRadius={75}>
            {times(data.length, (index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )
  }

  getData = () => {
    return map(this.props.balances, (balance, symbol) => ({ symbol, balance: toNumber(balance) }))
  }

  formatValue = (value: number): string => {
    return value.toString()
  }

  formatPrice = (price: number, formatter: Function = formatThousands): string => {
    const { symbol } = CURRENCIES[this.props.currency]
    return `${symbol}${formatter(price)}`
  }
}
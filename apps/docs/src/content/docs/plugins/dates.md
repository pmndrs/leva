---
title: Dates Plugin
description: Date and time picker for Leva
---

The Dates plugin provides date and time selection inputs for Leva.

## Installation

```bash
npm install @leva-ui/plugin-dates
```

## Basic Usage

```jsx
import { useControls } from 'leva'
import { date } from '@leva-ui/plugin-dates'

function App() {
  const { selectedDate } = useControls({
    selectedDate: date(new Date()),
  })

  return <div>Selected: {selectedDate.toDateString()}</div>
}
```

## Date Formats

### JavaScript Date Object

The most common format:

```jsx
const { birthday } = useControls({
  birthday: date(new Date('2000-01-01')),
})
```

### Timestamp

Use Unix timestamps:

```jsx
const { timestamp } = useControls({
  timestamp: date(Date.now()),
})
```

### ISO String

Use ISO 8601 date strings:

```jsx
const { isoDate } = useControls({
  isoDate: date('2024-03-15T10:30:00Z'),
})
```

## Configuration Options

### Date Range

Limit selectable dates:

```jsx
const { eventDate } = useControls({
  eventDate: date({
    value: new Date(),
    min: new Date('2024-01-01'),
    max: new Date('2024-12-31'),
  }),
})
```

### Time Precision

Include time selection:

```jsx
const { dateTime } = useControls({
  dateTime: date({
    value: new Date(),
    time: true, // Include time picker
  }),
})
```

### Format Display

Customize display format:

```jsx
const { date } = useControls({
  date: date({
    value: new Date(),
    format: 'MM/DD/YYYY', // Custom format
  }),
})
```

## Use Cases

### Event Scheduling

```jsx
import { folder } from 'leva'

const { schedule } = useControls({
  event: folder({
    startDate: date(new Date()),
    endDate: date(new Date(Date.now() + 86400000)), // +1 day
    reminderDate: date({
      value: new Date(Date.now() - 3600000), // -1 hour
      time: true,
    }),
  }),
})
```

### Content Filtering

Filter content by date range:

```jsx
function ContentFilter() {
  const { filters } = useControls({
    filters: folder({
      fromDate: date(new Date('2024-01-01')),
      toDate: date(new Date()),
      includeTime: false,
    }),
  })

  const filteredContent = content.filter((item) => {
    const itemDate = new Date(item.createdAt)
    return itemDate >= filters.fromDate && itemDate <= filters.toDate
  })

  return <ContentList items={filteredContent} />
}
```

### Appointment Booking

```jsx
function BookingForm() {
  const { booking } = useControls({
    appointment: folder({
      date: date({
        value: new Date(),
        min: new Date(), // Can't book in the past
        max: new Date(Date.now() + 90 * 86400000), // 90 days ahead
      }),
      time: date({
        value: new Date(),
        time: true,
      }),
      duration: { value: 60, min: 30, max: 180, step: 30 },
    }),
  })

  return <BookingConfirmation {...booking} />
}
```

### Data Visualization Timeline

```jsx
function TimelineViz() {
  const { timeline } = useControls({
    viewport: folder({
      start: date(new Date('2024-01-01')),
      end: date(new Date('2024-12-31')),
      resolution: {
        options: ['day', 'week', 'month', 'year'],
        value: 'month',
      },
    }),
  })

  return <Timeline {...timeline.viewport} />
}
```

## Date Utilities

### Formatting

```jsx
const { selectedDate } = useControls({ selectedDate: date(new Date()) })

// Format for display
const formatted = selectedDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// ISO format
const iso = selectedDate.toISOString()

// Custom format
const custom = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}/${selectedDate.getFullYear()}`
```

### Calculations

```jsx
const { startDate, duration } = useControls({
  startDate: date(new Date()),
  duration: { value: 7, min: 1, max: 365 }, // days
})

// Calculate end date
const endDate = new Date(startDate)
endDate.setDate(endDate.getDate() + duration)

// Calculate difference
const diffDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))
```

## Integration Examples

### With Date Libraries

```jsx
import { format, addDays, isAfter } from 'date-fns'

function App() {
  const { date } = useControls({
    date: date(new Date()),
  })

  const formatted = format(date, 'PPP') // "April 29th, 2021"
  const tomorrow = addDays(date, 1)
  const isFuture = isAfter(date, new Date())

  return <div>{formatted}</div>
}
```

### With Form Validation

```jsx
function Form() {
  const { dates } = useControls({
    dates: folder({
      start: date(new Date()),
      end: date(new Date()),
    }),
  })

  const isValid = dates.end > dates.start

  return (
    <form>
      <p>Start: {dates.start.toDateString()}</p>
      <p>End: {dates.end.toDateString()}</p>
      {!isValid && <span>End must be after start</span>}
      <button disabled={!isValid}>Submit</button>
    </form>
  )
}
```

### With Storage

```jsx
function App() {
  const { lastVisit } = useControls({
    lastVisit: date(new Date(localStorage.getItem('lastVisit') || Date.now())),
  })

  useEffect(() => {
    localStorage.setItem('lastVisit', lastVisit.toISOString())
  }, [lastVisit])
}
```

## Localization

Customize for different locales:

```jsx
const { date } = useControls({
  date: date({
    value: new Date(),
    locale: 'de-DE', // German
  }),
})

// Display in user's locale
const localized = date.toLocaleDateString(navigator.language)
```

## Accessibility

The date picker includes:

- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management

## Tips

1. **Set reasonable ranges**: Limit min/max to relevant dates
2. **Consider timezones**: Use UTC when storing dates
3. **Validate inputs**: Check date logic (end after start, etc.)
4. **Format consistently**: Use the same format throughout your app
5. **Handle edge cases**: Leap years, month boundaries, daylight saving

## Next Steps

- See [Creating Plugins](/plugins/creating/) to build custom date inputs
- Learn about [Configuration](/guides/configuration/)
- Explore other [Plugins](/guides/plugins/)

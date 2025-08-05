use time::PrimitiveDateTime as DateTime;

/// constant used to add a gigasecond to a given date.
const GIGASECOND: i64 = 1_000_000_000;

// Returns a DateTime one billion seconds after start.
pub fn after(start: DateTime) -> DateTime {
    start + time::Duration::seconds(GIGASECOND)
}

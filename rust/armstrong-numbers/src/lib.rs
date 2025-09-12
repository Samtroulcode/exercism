pub fn is_armstrong_number(num: u32) -> bool {
    let string_armstrong = num.to_string();

    let num_digits = string_armstrong.len();

    let mut sum = 0;

    for digit in string_armstrong.chars() {
        let digit_value = digit.to_digit(10).expect("Invalid digit");
        sum += digit_value.pow(num_digits as u32);
    }

    sum == num
}

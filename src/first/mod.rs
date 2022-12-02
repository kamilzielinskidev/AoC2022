use std::fs;

pub fn solution() -> usize {
    let a = fs::read_to_string("src/first/data").map(|v| {
        v.split("\n\n")
            .map(String::from)
            .map(|v| {
                v.split("\n")
                    .map(String::from)
                    .map(|v| v.parse::<usize>().unwrap())
                    .reduce(|acc, item| acc + item)
                    .unwrap()
            })
            .collect::<Vec<usize>>()
    });

    return 1;
}

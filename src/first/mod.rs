use std::fs;

fn sort_fn(vec: &Vec<usize>) -> Vec<usize> {
    let mut copy = vec.clone();
    copy.sort();
    copy
}

fn reverse(vec: &Vec<usize>) -> Vec<usize> {
    let mut copy = vec.clone();
    copy.reverse();
    copy
}

pub fn solution() -> Vec<usize> {
    fs::read_to_string("src/first/data")
        .map(|v| v.split("\n\n").map(String::from).collect::<Vec<String>>())
        .map(|v| {
            v.into_iter()
                .map(|v| {
                    v.lines()
                        .map(String::from)
                        .map(|v| v.parse::<usize>().unwrap_or(0))
                        .fold(0, |acc, v| acc + v)
                })
                .collect::<Vec<usize>>()
        })
        .map(|v| sort_fn(&v))
        .map(|v| reverse(&v))
        .unwrap()
}

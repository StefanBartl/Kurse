fn main() {
    let file = std::fs::read_to_string("lines").unwrap();

    //file
    //    .lines()
    //    .for_each(|line| println!("{}", line));

    /* every other line: 
    file
        .lines()
        .enumerate()
        .filter(|(idx, _)| idx % 2 == 0)
        .for_each(|(_, line)| println!("{}", line)); 
     */

    struct Custom {
        age: usize,
        name: String
    }

    enum Item {
        Number(usize),
        String(String),
        MyCustom(Custom),
    }

    fn append(items: &mut Vec<Item>){
        items.push(Item::String("Hello, Fem!".to_string()))
    }

    let mut items: Vec<Item> = vec![];
    append(&mut items);

    println("{:?}", items);

}
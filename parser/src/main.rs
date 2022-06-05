use clap::Parser as ClapParser;
use pulldown_cmark::{html::push_html, Parser as CmarkParser};
use std::{fs, path::PathBuf};

#[derive(ClapParser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(short, long)]
    input_dir: String,

    #[clap(short, long, default_value = "./output")]
    output_dir: String,
}

fn main() {
    let args = Args::parse();

    let dir =
        fs::read_dir(&args.input_dir).expect(&format!("{} dir doesn't exist!", &args.input_dir));

    for entry in dir {
        let path = entry.unwrap().path();
        let path_str = path.to_str().unwrap();

        if path_str.ends_with(".md") {
            let md_content = fs::read_to_string(&path).unwrap();
            let parser = CmarkParser::new(&md_content);

            let mut html = String::new();
            push_html(&mut html, parser.into_iter());

            let file_name = path.file_name().unwrap().to_str().unwrap();
            let file_prefix = file_name.split(".").next().unwrap();

            let resulting_dir = PathBuf::from(&args.output_dir);
            if !resulting_dir.exists() {
                println!("> {:?} doesn't exist :o", &resulting_dir);
                println!("> no worries, I'll make one! :)");
                fs::create_dir_all(&resulting_dir).expect("and I failed :(");
            }

            let resulting_path = resulting_dir.join(format!("{}.html", file_prefix));

            println!("* writing to {:?}", &resulting_path);
            fs::write(resulting_path, html).expect("! oh no, I couldn't write results to the file :(")
        }
    }

    println!("> done!")
}

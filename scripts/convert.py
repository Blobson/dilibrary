#!/usr/bin/env python3

import re
import sys
import uuid
import glob
import subprocess
import yaml


FILE_EXT = "txt"
LINE_PATTERN = re.compile(r"""^<a href=\"([^\"]+)\">\s*(.+)\s+-\s+([^<(\)]+)\s*(?:\(([^\(\)]+)\))?\s*(?:\(\d+\))?\s*<\/a>.*$""")
LINE_MULTIPLE_AUTHORS_PATTERN = re.compile(r"""^<a href=\"([^\"]+)\">\s*(.+\.-[^-]+)\s*-\s*([^<(\)]+)\s*(?:\(([^\(\)]+)\))?\s*(?:\(\d+\))?\s*<\/a>.*$""")
LINE_NO_AUTHOR_PATTERN = re.compile(r"""^<a href=\"([^\"]+)\">(.*)<\/a>.*$""")
LETTER_PATTERN = re.compile(r"""^Буква .$""")
CATEGORY_PATTERN = re.compile(r"""^([^:]+)\s*:?\s*$""")
CATEGORY_SUBST = {
    "ансамбли": ["ансамбль"],
    "б-ка + ф-но": ["балалайка", "фортепиано"],
    "балалайка и баян": ["балалайка", "баян"],
    "балалайка и гитара": ["балалайка", "гитара"],
    "балалайка и домра": ["балалайка", "домра"],
    "балалайки": ["балалайка"],
    "б-ка": ["балалайка"],
    "б-ка соло": ["балалайка", "соло"],
    "домра и баян": ["домра", "баян"],
    "домра и гитара": ["домра", "гитара"],
    "домры": ["домра"],
    "дуэт балалаек": ["дуэт", "балалайка"],
    "дуэт домр": ["дуэт", "домра"],
    "дуэты": ["дуэт"],
    "гаммы и упражнения": ["гаммы", "упражнения"],
    "гаммы, арпеджио, аккорды": ["гаммы", "арпеджио", "аккорды"],
    "квартеты": ["квартет"],
    "квинтеты и более": ["квинтет и более"],
    "необычные составы": ["необычный состав"],
    "сборники": ["сборник"],
    "этюды": ["этюд"],
    "малая + альт": ["домра"],
}

SOURCE_DIR = sys.argv[1]


def parse_file(fname: str) -> list:
    categories = set()
    for cat in fname.removeprefix(f"{SOURCE_DIR}/HTML каталог ").removesuffix(f".txt").split("/"):
        if not LETTER_PATTERN.match(cat):
            cat = cat.lower().strip()
            cats = CATEGORY_SUBST[cat] if cat in CATEGORY_SUBST else [cat]
            for cat in cats:
              categories.add(cat)

    local_cats = [ *categories ]
    sheets = []
    with open(fname, "r") as fh:
        print(f"--- {fname} ---", file=sys.stderr)
        for line in fh.readlines():
            if not line.strip():
                continue

            match = re.match(LINE_MULTIPLE_AUTHORS_PATTERN, line)
            if match:
                authors = [author.strip() for author in match.group(2).strip().split("-")]
            else:
                match = re.match(LINE_PATTERN, line)
                if match:
                    authors = [ match.group(2).strip() ]

            if match:
                sheet = {}
                sheet['id'] = str(uuid.uuid4())
                sheet['url'] = match.group(1).strip()
                sheet['authors'] = authors
                sheet['title'] = match.group(3).strip()
                if match.group(4):
                    sheet['mod'] = match.group(4).strip()
                sheet['categories'] = local_cats
                if sheet['title'] != "название":
                  sheets.append(sheet)
                continue

            match = re.match(LINE_NO_AUTHOR_PATTERN, line)
            if match:
                sheet = {}
                sheet['id'] = str(uuid.uuid4())
                sheet['url'] = match.group(1).strip()
                sheet['authors'] = []
                sheet['title'] = match.group(2).strip()
                sheet['categories'] = local_cats
                if sheet['title'] != "название":
                  sheets.append(sheet)
                continue

            match = re.match(CATEGORY_PATTERN, line)
            if match:
                cat = match.group(1).strip().lower()
                cat = CATEGORY_SUBST[cat] if cat in CATEGORY_SUBST else [cat]
                local_cats = list(set([ *categories, *cat ]))
                continue

            print(line, file=sys.stderr)

    return sheets


class NoAliasDumper(yaml.SafeDumper):
    def ignore_aliases(self, data):
        return True



if __name__ == "__main__":
  sheets = []
  categories = set()

  for file in glob.glob(f"{SOURCE_DIR}/**/*.docx", recursive=True):
      subprocess.run(["/usr/bin/docx2txt", file])
      file_sheets = parse_file(file.replace("docx", "txt"))
      sheets += file_sheets
      for sheet in file_sheets:
        for cat in sheet['categories']:
            categories.add(cat)

  print(yaml.dump({
      "sheets": sheets,
      "categories": sorted(list(categories)),
  }, allow_unicode=True, Dumper=NoAliasDumper))

  print(f"FOUND {len(sheets)} sheets", file=sys.stderr)

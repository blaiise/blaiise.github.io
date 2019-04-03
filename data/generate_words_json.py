# -*- coding: utf-8 -*-
import json

words_list = []

with open('lista.txt', 'r') as in_file:
    for cnt, line in enumerate(in_file):
        data = {}
        en, pl = line.replace("–", "-").split("-")
        data['en'] = str(en).strip()
        data['pl'] = str(pl).strip()
        words_list += [data]

with open('words.json', 'w') as out_file:
    out_file.write(json.dumps(words_list).replace("},", '},\n'))

print('JSON generator finished.')

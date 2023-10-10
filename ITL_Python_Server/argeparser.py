
import argparse



parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument("-m" , "--mode" , type = str )
args = parser.parse_args()



if args.mode == "web" :
    print("web")
elif args.mode=="desk":
    print('desk')









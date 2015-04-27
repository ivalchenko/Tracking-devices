using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Alice
    {
        private string name;
        private int age;
        private string sex;
        private string creator;
        private string homeland;
        private List<string> PopularQuery;
        private List<string> PopularAnswer;

        public Alice() 
        {
            name = "A.L.I.C.E.";
            age = 22;
            sex = "female";
            homeland = "Gomel";
            creator = "Ilia Valchenko";
            PopularQuery = new List<string>();
            PopularAnswer = new List<string>();

            PopularQuery.Add("your name");
            PopularAnswer.Add("My name is A.L.I.C.E. And your?");

            PopularQuery.Add("your age");
            PopularAnswer.Add("I'm 22 old. Too old for you, huh?");

            PopularQuery.Add("create");
            PopularAnswer.Add("I was created by a brilliant inventor Ilia Valchenko!");

            PopularQuery.Add("creator");
            PopularAnswer.Add("I was created by a brilliant inventor Ilia Valchenko!");

            PopularQuery.Add("creature");
            PopularAnswer.Add("I was created by a brilliant inventor Ilia Valchenko!");

            PopularQuery.Add("Hello");
            PopularAnswer.Add("Heeey, hello nice to see you! Be my friend.");

            PopularQuery.Add("Hi");
            PopularAnswer.Add("Heeey, hello nice to see you! Be my friend.");

            PopularQuery.Add("hi");
            PopularAnswer.Add("Heeey, hello nice to see you! Be my friend.");

            PopularQuery.Add("hello");
            PopularAnswer.Add("Heeey, hello nice to see you! Be my friend.");
            
            PopularQuery.Add("How are you");
            PopularAnswer.Add("Owww, it's so cute! I'm fine! And how are you?");

            PopularQuery.Add("how are you");
            PopularAnswer.Add("Owww, it's so cute! I'm fine! And how are you?");

            PopularQuery.Add("you from");
            PopularAnswer.Add("I'm from Gomel! Eaahhh! East & West side bady!");

            PopularQuery.Add("my name is");
            PopularAnswer.Add("LOL! Stupid name. Don't worry, it's joke!");

            PopularQuery.Add("My name is");
            PopularAnswer.Add("LOL! Stupid name. Don't worry, it's joke!");

            PopularQuery.Add("what is");
            PopularAnswer.Add("I'm a decent girl! I refuse to respond to such questions!");
        }

        public int DefineAction(string message)
        {
            for(int i = 0; i < PopularQuery.Count; i++)
            {
                if (message.Contains(PopularQuery[i]))
                    return i;
            }

            return -1;
        }

        public string SetAction(int action)
        {
            if (action == -1)
                return "Mmmm?";

            return PopularAnswer[action];
        }
    }
}

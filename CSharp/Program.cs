using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            Alice alice = new Alice();
            string message = "";
            string answer = "";

            
                System.Console.WriteLine("Hello now you start to talk with A.L.I.C.E. Write something :)");
                while (!message.Equals("stop"))
                {
                try
                {
                    message = Convert.ToString(Console.ReadLine());
                }
                catch (System.FormatException e)
                {
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine("\nSYSTEM FORMAT EXCEPTION: ");
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.Write(e.StackTrace);
                    Console.ResetColor();

                    Console.ForegroundColor = ConsoleColor.Cyan;
                    Console.WriteLine("\n\nTap to continue...");
                    Console.ReadKey(true);
                }

                answer = alice.SetAction(alice.DefineAction(message));
                System.Console.WriteLine(answer);
            }

            Console.ReadKey(true);
        }
    }
}

﻿#if GENERATEDCODE_ON
using SEBookStoreAngular.Logic.Modules.Exceptions;

namespace SEBookStoreAngular.ConApp
{
    /// <summary>
    /// This partial class of Program contains the ImportData method, which imports book data from a CSV file into the database.
    /// </summary>
    partial class Program
    {
        /// <summary>
        /// Imports book data from a CSV file located in the "Data" directory.
        /// Each line in the CSV file represents a book with its details separated by semicolons.
        /// The method reads the file, parses the data, and adds each book to the database.
        /// </summary>
        /// <remarks>
        /// The CSV file is expected to have the following columns in order:
        /// ISBNNumber, Author, Description, Price, Title, YearOfRelease.
        /// </remarks>
        /// <exception cref="BusinessException">Thrown when a business rule is violated while adding a book to the database.</exception>
        /// <exception cref="Exception">Thrown for any other errors during the import process.</exception>
        static partial void ImportData()
        {
            int index = 0;
            var asmLocation = System.Reflection.Assembly.GetExecutingAssembly().Location;
            var exePath = Path.GetDirectoryName(asmLocation);
            var filePath = Path.Combine(exePath!, "Data", "book_dataset.csv");
            var books = File.ReadAllLines(filePath).Skip(1)
                .Select(line => line.Split(';'))
                .Select(parts => new Logic.Entities.Book
                {
                    ISBNNumber = parts[0],
                    Author = parts[1],
                    Description = parts[2],
                    Price = double.Parse(parts[3]),
                    Title = parts[4],
                    YearOfRelease = int.Parse(parts[5])
                });

            using var context = CreateContext();

            foreach (var book in books)
            {

                try
                {
                    index++;
                    context.BookSet.Add(book);
                    context.SaveChanges();
                }
                catch (BusinessRuleException ex)
                {
                    Console.WriteLine($"Error on line {index} {book}: {ex.Message}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error on line {index}: {ex.InnerException}");
                }
                finally
                {
                    context.RejectChanges();
                }
            }
        }
    }
}
#endif
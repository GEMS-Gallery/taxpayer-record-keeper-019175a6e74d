import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor {
  // Define the TaxPayer type
  public type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store TaxPayer records
  private stable var taxPayerEntries : [(Text, TaxPayer)] = [];

  // Create a HashMap to store TaxPayer records
  private var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

  // Initialize the HashMap with stable data
  system func preupgrade() {
    taxPayerEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayerEntries.vals(), 0, Text.equal, Text.hash);
    taxPayerEntries := [];
  };

  // Add a new TaxPayer record
  public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async () {
    let newTaxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(tid, newTaxPayer);
  };

  // Get all TaxPayer records
  public query func getTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  // Search for a TaxPayer by TID
  public query func searchTaxPayer(tid: Text) : async ?TaxPayer {
    taxPayers.get(tid)
  };
}
